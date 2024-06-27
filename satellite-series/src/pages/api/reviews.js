import { db, Series, eq, Review, and, like} from "astro:db";


async function countReviewsId(){
    const seriesDb = await db.select().from(Review);
    return seriesDb.length + 1;
}

export async function POST(context) {

    const formData = await context.request.formData();


    const content = formData.get('content');
    const rating = formData.get('rating');
    const seriesId = formData.get('seriesId');
    const userId =  context.locals.user.id;
    const username = context.locals.user.username;

    const newReview = {};
    newReview.comment = content || '';
    newReview.rating = rating;
    newReview.seriesId = seriesId;
    newReview.userId = userId;
    newReview.userName = username;


    try {

        newReview.id = await countReviewsId();

        await db.insert(Review).values(newReview);
        return new Response(JSON.stringify({ message: "Review added successfully" }), {
            status: 201,
          });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Error adding series" }), {
            status: 500
        });
    }
}

