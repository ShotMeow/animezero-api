import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from '@/auth/auth.module';
import { AppController } from '@/app.controller';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    MoviesModule,
    AuthModule,
    CountriesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
