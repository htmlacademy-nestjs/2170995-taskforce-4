import { Review } from '@project/shared/app-types';
import { ReviewEntity } from './review.entity';
import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { randomUUID } from 'crypto';


@Injectable()
export class ReviewMemoryRepository implements CRUDRepository<ReviewEntity, string, Review> {
  private repository: Record<string, Review> = {};

  public async create(item: ReviewEntity): Promise<Review> {
    const entry = { ...item.toObject(), _id: randomUUID()};
    this.repository[entry._id] = entry;

    return entry;
  }

  public async findById(id: string): Promise<Review> {
    if(this.repository[id]) {
      return { ...this.repository[id]};
    }

    return null;
  }

  public async update(id: string, item: ReviewEntity): Promise<Review> {
    this.repository[id] = { ...item.toObject(), _id: id};
    return this.findById(id);
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }
}
