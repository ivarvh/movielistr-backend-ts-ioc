import { Singleton } from 'typescript-ioc';
import * as BigInt from 'big-integer';

@Singleton
export default class IDUtils {

    private loadNs = process.hrtime();
    private loadMs = new Date().getTime();

    public generateUniqueId(): string {
        return this.nanoSeconds() //just returning the current nanoseconds, should be unique enough.
    };

    private nanoSeconds(): string {
        let diffNs = process.hrtime(this.loadNs);
        return BigInt(this.loadMs).times(1e6).add(BigInt(diffNs[0]).times(1e9).plus(diffNs[1])).toString();
    }
}