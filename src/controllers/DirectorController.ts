import { Context } from "koa";
import { IMiddleware, IRouterContext } from "koa-router";
import { Inject, Singleton } from "typescript-ioc";
import Director from "../models/Director";
import DirectorService from "../services/DirectorService";

@Singleton
export default class DirectorController {

    constructor( @Inject private directorService: DirectorService) { }

    public async getAllDirectors(ctx: IRouterContext) {
        ctx.body = await this.directorService.findAll();
    }

    public async findDirectorById(ctx: IRouterContext) {
        try {
            ctx.body = await this.directorService.findById(ctx.params.id);
        } catch (e) {
            ctx.throw(404);
        }
    }

    public async saveDirector(ctx: IRouterContext) {
        try {
            const director: Director = Director.newDirector(ctx.request.body);
            const result = await this.directorService.save(director);
            ctx.body = result;
        } catch (e) {
            ctx.throw(400, e.message);
        }
    }

    public async updateDirector(ctx: IRouterContext) {
        try {
            const director: Director = Director.newDirector(ctx.request.body);
            if (String(ctx.params.id) !== String(director.$id)) {
                ctx.throw(400);
            }
            const result = await this.directorService.update(director);
        } catch (e) {
            ctx.throw(400, e.message);
        }
    }

    public async deleteDirector(ctx: IRouterContext) {
        const directorId = ctx.params.id;
        await this.directorService.delete(directorId);
        ctx.status = 200;
    }
}
