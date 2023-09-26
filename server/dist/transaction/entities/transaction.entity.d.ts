import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Transaction {
    id: number;
    title: string;
    type: string;
    user: User;
    category: Category;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}
