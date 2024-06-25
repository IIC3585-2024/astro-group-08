import { column, defineDb, defineTable } from 'astro:db';

const Series = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    streamingService: column.text(),
    episodesPerSeason: column.json(),
    description: column.text(),
    category: column.text(),
    image: column.text({ optional: true }),
    ratings: column.json(),
    comments: column.json(),
  }
});

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    username: column.text(),
    password: column.text(),
  }
});

const Session = defineTable({
	columns: {
		id: column.text({
			primaryKey: true
		}),
		expiresAt: column.date(),
		userId: column.text({
			references: () => User.columns.id
		})
	}
});

export default defineDb({
  tables: { Series, User, Session },
});
