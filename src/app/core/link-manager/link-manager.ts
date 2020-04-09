import { Link } from './link';

export class LinkManager {
    constructor(private _inputLinks: Array<Link>) { }

    byRel(rel: string): Link {
        const matchedLink = this._inputLinks
            .find(inputLink => inputLink.rel === rel);

        if (!matchedLink) {
            throw new Error(`Link with ref ${rel} was not found.`);
        }

        return new Link(matchedLink.rel, matchedLink.href);
    }
}
