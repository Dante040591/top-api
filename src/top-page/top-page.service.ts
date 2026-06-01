import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopLevelCategory, TopPageModel } from './top-page.model';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(@InjectModel(TopPageModel.name) private readonly topPageModel: Model<TopPageModel>) {}

  async create(dto: CreateTopPageDto): Promise<TopPageModel> {
    return this.topPageModel.create(dto);
  }

  async findById(id: string): Promise<TopPageModel | null> {
    return this.topPageModel.findById(id).exec();
  }

  async findByAlias(alias: string): Promise<TopPageModel | null> {
    return this.topPageModel.findOne({ alias }).exec();
  }

  async deleteById(id: string): Promise<TopPageModel | null> {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateTopPageDto): Promise<TopPageModel | null> {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async findByCategory(firstCategory: TopLevelCategory): Promise<TopPageModel[]> {
    return this.topPageModel.find({ firstCategory }, { _id: 1, alias: 1, secondCategory: 1, title: 1 }).exec();
  }

  async findByText(text: string): Promise<TopPageModel[]> {
    return this.topPageModel.find({ $text: { $search: text, $caseSensitive: false } }).exec();
  }
}
