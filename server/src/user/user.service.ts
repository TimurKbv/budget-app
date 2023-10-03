import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExist = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    })
    if (userExist) {
      throw new BadRequestException(
        `User with email: ${createUserDto.email} already exists!`,
      )
    }
    const newUser = await this.userRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
    })

    const token = this.jwtService.sign({ email: createUserDto.email })
    return { newUser, token }
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({ where: { email } })
  }

  // findAll() {
  //   return `This action returns all user`
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`
  // }
}
