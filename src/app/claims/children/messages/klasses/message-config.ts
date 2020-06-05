export class MessageConfig {
    isSquashedUpAndDown: boolean;
    isLastFromSameSequence: boolean;

    constructor(
        public hasNextSubsequentMessage = false,
        public hasPreviousSubsequentMessage = false) {

        this.isSquashedUpAndDown = hasNextSubsequentMessage && hasPreviousSubsequentMessage;
        this.isLastFromSameSequence = !hasNextSubsequentMessage && hasPreviousSubsequentMessage;
    }
}
