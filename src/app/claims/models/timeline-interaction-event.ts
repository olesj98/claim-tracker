import { Link } from '@pko/core';

import { TimelineEventType } from './timeline-tab';

export interface TimelineInteractionEvent<T> {
    value: T;
    eventType: TimelineEventType;
    links: Array<Link>;
}
