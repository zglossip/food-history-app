import { createApp } from "vue";

export const mockMount = (composable: Function) => {
    let result;
    const app = createApp({
        setup() {
            result = composable()

            return () => {};
        }
    })

    app.mount(document.createElement('div'));
    return result
}