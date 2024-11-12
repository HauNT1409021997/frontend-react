export interface UserInterface {
    id: number | null;
    name: string;
    email: string;

    setName(name: string): void;
    setEmail(email: string): void;
    getName(): string;
    getEmail(): string;
    getId(): number | null;
}
