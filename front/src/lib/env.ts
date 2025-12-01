class Env {
    static APP_URL : string = process.env.NEXT_PUBLIC_APP_URL ?? "";
    static BACKEND_URL: string = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

      // Optional: helper to check if envs are missing
    static validate() {
        if (!this.APP_URL) throw new Error("NEXT_PUBLIC_APP_URL is not defined");
        if (!this.BACKEND_URL) throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
  }
}

Env.validate();

export default Env;