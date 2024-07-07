import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from '@/auth/auth.module';
import { AppController } from '@/app.controller';
import { CountriesModule } from './countries/countries.module';
import { TagsModule } from './tags/tags.module';
import { GenresModule } from '@/genres/genres.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    MoviesModule,
    AuthModule,
    CountriesModule,
    TagsModule,
    GenresModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
