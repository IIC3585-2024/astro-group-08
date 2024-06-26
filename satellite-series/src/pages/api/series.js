import { db, Series, eq, Review, and, like} from "astro:db";



export async function getSeries() {
    try {
        const allSeries = await db.select().from(Series);
        return new Response(JSON.stringify(allSeries));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Error fetching series" }), {
            status: 500
        });
    }

}

export async function getFilteredSeries(filter = {}) {
    try {
        let query = db.select().from(Series);

        // Build the query based on the filter object
        const conditions = [];
        if (filter.title && filter.title.length > 0) {
            conditions.push(like(Series.title, `%${filter.title}%`));
        }
        if (filter.category) {
            conditions.push(eq(Series.category, filter.category));
        }
        if (filter.streamingService) {
            conditions.push(eq(Series.streamingService, filter.streamingService));
        }
        // Add other filter conditions as needed

        if (conditions.length > 0) {
            query = query.where(and(...conditions));
        }

        const allSeries = await query;


        return new Response(JSON.stringify(allSeries));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Error fetching series" }), {
            status: 500
        });
    }
}

export async function getSeriesById(id) {
    try {

        if(!id)         return new Response(JSON.stringify({ error: "Error fetching series" }), {
            status: 500
        });
        
        const allSeries = await db.select().from(Series).where(eq(Series.id, id));

        return new Response(JSON.stringify(allSeries[0]));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Error fetching series" }), {
            status: 500
        });
    }
}


export async function getReviewsBySeriesId(id) {
    try {
        const allReviews = await db.select().from(Review).where(eq(Review.seriesId, id));
        return new Response(JSON.stringify(allReviews));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Error fetching reviews" }), {
            status: 500
        });
    }

}

function parseEpisodesPerSeason(episodes){
    const newEpisodes = episodes.split(',').map((value) => {
        const num = parseInt(value, 10);
        if (isNaN(num)) throw new Error('Invalid episodes');
        return num;
    });
    return newEpisodes;
}

async function countSeriesId(){
    const seriesDb = await db.select().from(Series);
    return seriesDb.length + 1;
}

export async function POST(context) {

    const formData = await context.request.formData();
    const title = formData.get('title');
    const streamingService = formData.get('streamingService');
    const episodesPerSeason = formData.get('episodesPerSeason');
    const description = formData.get('description');
    const category = formData.get('category');
    const image = formData.get('image');

    const newSeries = {};

    newSeries.title = title;
    newSeries.streamingService = streamingService;
    try {
        newSeries.episodesPerSeason = parseEpisodesPerSeason(episodesPerSeason);
    }
    catch (error){
        console.error(error);
        return new Response(JSON.stringify({ error: error }), {
            status: 501
        });
    }
    newSeries.description = description || 'No description available';
    newSeries.category = category || 'No category';
    newSeries.image = image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkua4zc6vGKg6FGl5tqsmqbbva__CLi84gvQ&s";

	try {
        // newSeries.id = await db.select({ value: count(Series.id) }).from(Series); // No se si estan bien la mayuscula en Series
        newSeries.id = await countSeriesId();

        newSeries.ratings = [];
        newSeries.comments = [];
        await db.insert(Series).values(newSeries);

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Error adding series" }), {
            status: 500
        });
    }

	return context.redirect("/");
}