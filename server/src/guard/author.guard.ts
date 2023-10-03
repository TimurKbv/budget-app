import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { CategoryService } from 'src/category/category.service'
import { TransactionService } from 'src/transaction/transaction.service'

@Injectable()
export class AuthorGuard implements CanActivate {
	constructor(
		private readonly transactionService: TransactionService,
		private readonly categoryService: CategoryService,
	) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const { id, type } = request.params
		let entity

		console.log('Type is =>>> ' + type)
		console.log('User is =>>>' + JSON.stringify(request.user))

		switch (type) {
			case 'transaction':
				entity = await this.transactionService.findOne(id)
				break
			case 'category':
				entity = await this.categoryService.findOne(id)
				break
			default:
				throw new NotFoundException('Something went wrong...')
		}

		console.log('Transaction creator is =>>>' + JSON.stringify(entity.user))

		const user = request.user
		if (entity && user && user.id === entity.user.id) {
			return true
		}
		throw new BadRequestException(
			`${user.email} do not have rights to ${type} with id: ${entity.id}`,
		)
	}
}