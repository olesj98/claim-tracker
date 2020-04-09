import { Link } from './link';
import { LinkManager } from './link-manager';

export function hrefGet(inputLinks: Array<Link>, rel: string): string {
    return new LinkManager(inputLinks)
        .byRel(rel).href;
}
