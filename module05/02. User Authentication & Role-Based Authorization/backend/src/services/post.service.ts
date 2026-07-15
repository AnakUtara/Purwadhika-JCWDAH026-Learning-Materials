import type {
	PostCreateInput,
	PostOrderByWithRelationInput,
	PostSelect,
	PostUpdateInput,
	PostWhereInput,
} from "../generated/prisma/models.js";
import postRepo from "../repositories/post.repo.js";
import type { IPaginationParams } from "../utils/pagination.util.js";

class PostService {
	async publicList(
		search?: string,
		filters?: Record<string, string | number | boolean>,
		customSelect?: PostSelect,
		pagination: IPaginationParams = { limit: 10, page: 1 },
		sortOrder: "asc" | "desc" = "desc",
		orderBy: keyof PostOrderByWithRelationInput = "createdAt",
	) {
		const whereClause: PostWhereInput = {
			published: true,
		};

		if (filters) {
			for (const [key, value] of Object.entries(filters)) {
				if (key === "published" && typeof value === "boolean") {
					whereClause.published = value;
				}
			}
		}

		if (search) {
			whereClause.AND = [{ title: { contains: search, mode: "insensitive" } }];
		}

		return postRepo.list(whereClause, pagination, customSelect, {
			[orderBy]: sortOrder,
		});
	}

	async authorList(
		authorId: number,
		search?: string,
		filters?: Record<string, string | number | boolean>,
		customSelect?: PostSelect,
		pagination: IPaginationParams = { limit: 10, page: 1 },
		sortOrder: "asc" | "desc" = "desc",
		orderBy: keyof PostOrderByWithRelationInput = "createdAt",
	) {
		const whereClause: PostWhereInput = {
			published: true,
			authorId,
		};

		if (filters) {
			for (const [key, value] of Object.entries(filters)) {
				if (key === "published" && typeof value === "boolean") {
					whereClause.published = value;
				}
			}
		}

		if (search) {
			whereClause.AND = [{ title: { contains: search, mode: "insensitive" } }];
		}

		return postRepo.list(whereClause, pagination, customSelect, {
			[orderBy]: sortOrder,
		});
	}

	async details(postId: string, customSelect?: PostSelect) {
		return postRepo.find({ id: postId }, customSelect);
	}

	async create(authorId: number, data: PostCreateInput) {
		const postData: PostCreateInput = {
			...data,
			author: {
				connect: { id: authorId },
			},
		};
		return postRepo.create(postData);
	}

	async update(postId: string, data: PostUpdateInput) {
		return postRepo.update({ id: postId }, data);
	}

	async delete(postId: string) {
		return postRepo.delete({ id: postId });
	}
}

export default new PostService();
