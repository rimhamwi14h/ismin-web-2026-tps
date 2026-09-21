import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
<<<<<<< HEAD
import { TASKS } from './model.js';
import type { Model, Task } from './model.js';
//import {ModelModel as DBModel} from '../generated/prisma/models.js';
=======
import { Model, Task } from './model.js';

>>>>>>> d005b82689cdc2861ae7747bc50419a70bf94dd3
/**
 * The service, to be moved from memory to the database.
 *
 * The public contract does not change, but everything becomes
 * **asynchronous**: every Prisma call goes over the network and returns
 * a promise.
 *
 * 👉 STEP 4: replace each `throw` with a Prisma call.
 *
 * ⚠️ Three differences from yesterday's Map:
 *
 *    - `findUnique` returns `null`, not `undefined`
 *
 *    - `delete` throws when the row does not exist
 *      (look at `deleteMany`, or catch the error)
 *
 *    - SQLite has no union types: as far as the database is concerned,
 *      `task` is any string. So the compiler will refuse to treat a
 *      database row as a `Model`. Same lesson as session 1: what comes
 *      from outside is not guaranteed. Narrow the type at the boundary:
 *      a small private `toModel(row)` helper does the job nicely.
 */
@Injectable()
export class ModelsService {
  constructor(private readonly prisma: PrismaService) {}

<<<<<<< HEAD
async create(model: Model): Promise<Model> {
  const { org, ...modelData } = model;

  const created = await this.prisma.model.upsert({
    where: {
      id: model.id,
    },

    create: {
      ...modelData,
      license: model.license ?? null,

      organisation: {
        connectOrCreate: {
          where: {
            slug: org,
          },
          create: {
            slug: org,
            name: org,
          },
        },
      },
    },

    update: {
      ...modelData,
      license: model.license ?? null,

      organisation: {
        connectOrCreate: {
          where: {
            slug: org,
          },
          create: {
            slug: org,
            name: org,
          },
        },
      },
    },

    include: {
      organisation: true,
    },
  });

  return this.toModel(created);
}
  async findAll(filters: { org?: string; task?: Task } = {}): Promise<Model[]> {
    const row = await this.prisma.model.findMany({
      where: {
        org: filters.org,
        task: filters.task,
      },
    });
    return row.map((row) => this.toModel(row));
  }

  async findOne(id: string): Promise<Model | null> {
    const row = await this.prisma.model.findUnique({
      where: {id},
    });
      if (row === null) {
    return null;
  }

  return this.toModel(row);
  }

  /** Returns `true` if the model existed, `false` otherwise. */
async remove(id: string): Promise<boolean> {
  const result = await this.prisma.model.deleteMany({
    where: { id },
  });

  return result.count > 0;
}
=======
  async create(model: Model): Promise<Model> {
    throw new Error('create is not implemented yet');
  }

  async findAll(filters: { org?: string; task?: Task } = {}): Promise<Model[]> {
    throw new Error('findAll is not implemented yet');
  }

  async findOne(id: string): Promise<Model | null> {
    throw new Error('findOne is not implemented yet');
  }

  /** Returns `true` if the model existed, `false` otherwise. */
  async remove(id: string): Promise<boolean> {
    throw new Error('remove is not implemented yet');
  }
>>>>>>> d005b82689cdc2861ae7747bc50419a70bf94dd3

  /** Given: used by the tests to start from an empty database. */
  async clear(): Promise<void> {
    await this.prisma.model.deleteMany();
  }
<<<<<<< HEAD
 private toModel(row: {
  id: string;
  name: string;
  task: string;
  parameters: number;
  downloads: number;
  license: string | null;
  organisation: {
    slug: string;
  };
}): Model {
  if (!TASKS.includes(row.task as Task)) {
    throw new Error(`Unknown task: ${row.task}`);
  }

  return {
    id: row.id,
    name: row.name,
    org: row.organisation.slug,
    task: row.task as Task,
    parameters: row.parameters,
    downloads: row.downloads,
    license: row.license ?? undefined,
  };
}
//  private toDBModel (model:Model): DBModel {
  //  return {
    //  ...model,
      //license: model.license?? null
//    }
 // }
=======
>>>>>>> d005b82689cdc2861ae7747bc50419a70bf94dd3
}
