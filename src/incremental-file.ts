import * as fs from 'fs';

export function incrementalFile(key: string, type: 'date' | 'string' = 'string', file = '.incremental') {
	return {
		get() {
			const data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf-8')) : {};
			return new Date(data?.[key] ?? '1970-01-01T00:00:00.000Z');
		},
		set(date: Date) {
			const data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf-8')) : {};
			data[key] = date;
			fs.writeFileSync(file, JSON.stringify(data));
		}
	};
}

export default incrementalFile;
