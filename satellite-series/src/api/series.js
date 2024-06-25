import { db, Series } from "astro:db";


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

function parseEpisodesPerSeason(episodes){
    const newEpisodes = episodes.split(',').map((value) => {
        const num = parseInt(value, 10);
        if (isNaN(num)) throw new Error('Invalid episodes');
        return num;
    });
    return newEpisodes;
}

export async function postNewSeries(seriesForm) {


    const newSeries = {};

    newSeries.title = seriesForm.title;
    newSeries.streamingService = seriesForm.streamingService;
    try {
        newSeries.episodesPerSeason = parseEpisodesPerSeason(seriesForm.episodesPerSeason);
    }
    catch (error){
        console.error(error);
        return new Response(JSON.stringify({ error: error }), {
            status: 501
        });
    }
    newSeries.description = seriesForm.description || 'No description available';
    newSeries.category = seriesForm.category || 'No category';
    newSeries.image = seriesForm.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkua4zc6vGKg6FGl5tqsmqbbva__CLi84gvQ&s";

	try {
        newSeries.id = db.select({ value: count(Series.id) }).from(Series); // No se si estan bien la mayuscula en Series
        newSeries.ratings = [];
        newSeries.comments = [];
        await db.insert(Series).values(newSeries);

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Error adding series" }), {
            status: 500
        });
    }

    return new Response(JSON.stringify({ message: "Series added succsesfully" }), {
        status: 201
    });
	// return context.redirect("/catalog");
}