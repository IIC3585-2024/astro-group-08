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
    rating: column.number({ optional: true }),

  }
});

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    username: column.text(),
    password: column.text(),
    pfp: column.text({ optional: true }),
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

const Review = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    seriesId: column.number({
      references: () => Series.columns.id
    }),
    userId: column.text({
      references: () => User.columns.id
    }),
    userName: column.text(),
    rating: column.number(),
    comment: column.text(),
  }
});

export default defineDb({
  tables: { Series, User, Session, Review },
});
