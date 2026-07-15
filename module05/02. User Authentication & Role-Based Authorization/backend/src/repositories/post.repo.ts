import type { Post } from "../generated/prisma/client.js";
import type {
	PostCreateInput,
	PostOrderByWithRelationInput,
	PostSelect,
	PostUpdateInput,
	PostWhereInput,
	PostWhereUniqueInput,
} from "../generated/prisma/models.js";
import { prisma } from "../libs/prisma.client.js";
import { paginate, type IPaginationParams } from "../utils/pagination.util.js";

class PostRepository {
	async list(
		where: PostWhereInput = {},
		pagination?: IPaginationParams,
		select?: PostSelect,
		orderBy?: PostOrderByWithRelationInput,
	) {
		return paginate(
			(skip, take) =>
				prisma.post.findMany({
					where,
					skip,
					take,
					select,
					orderBy,
				}),
			() => prisma.post.count({ where }),
			pagination,
		);
	}

	async find(where: PostWhereUniqueInput, select?: PostSelect) {
		return prisma.post.findUnique({
			where,
			select,
		});
	}

	async create(data: PostCreateInput): Promise<Post> {
		return prisma.post.create({ data });
	}

	async update(
		where: PostWhereUniqueInput,
		data: PostUpdateInput,
	): Promise<Post> {
		return prisma.post.update({ where, data });
	}

	async delete(where: PostWhereUniqueInput): Promise<Post> {
		return prisma.post.delete({ where });
	}
}

export default new PostRepository();
