import { error } from '@sveltejs/kit'
import { ReviewService } from '$lib/services'
const isServer = import.meta.env.SSR

export async function load({ params, parent, url, cookies, locals, request }) {
	const { slug } = params
	const brandId = url.searchParams.get('brandId')
	const { sid, origin, store } = await parent()
	return {
		pid: slug,
		productReviews: ReviewService.fetchProductReviews({
			page: url?.searchParams.get('page') || 1,
			slug,
			origin,
			storeId: store?.id,
			server: true,
			sid
		})
	}
}
