export default Super =>
    class extends Super {

        // public
        async run ( ctx, requestMessage ) {
            return this.sendCommandsList( ctx );
        }
    };
