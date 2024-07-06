import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    MoviesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
