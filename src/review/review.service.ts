import { Injectable } from '@nestjs/common';
import { ReviewModel } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(ReviewModel.name) private readonly reviewModel: Model<ReviewModel>) {}

  async create(dto: CreateReviewDto): Promise<ReviewModel> {
    return this.reviewModel.create(dto);
  }

  async delete(id: string): Promise<ReviewModel | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<ReviewModel[]> {
    return this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec();
  }
}
