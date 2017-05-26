import { Context } from "koa";
import { IMiddleware, IRouterContext } from "koa-router";
import { Inject, Singleton } from "typescript-ioc";
import Director from "../models/Director";
import DirectorService from "../services/DirectorService";

@Singleton
export default class DirectorController {

    constructor( @Inject private directorService: DirectorService) { }

    public getDirectorMessage(ctx: IRouterContext) {
        ctx.body = this.directorService.getDirectorMessage();
    }

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
        const director: Director = ctx.request.body;
        return this.directorService.save(director);
    }

    public async deleteDirector(ctx: IRouterContext) {
        const directorId = ctx.params.id;
        await this.directorService.deleteDirector(directorId);
        ctx.status = 200;
    }
}
