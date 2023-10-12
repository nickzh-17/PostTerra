import { LogStatus } from "./unions";

export interface Log {
	type: LogStatus | "";
	event: string;
	message: string;
	// error: Error | null
}
