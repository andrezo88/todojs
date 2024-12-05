import { create, getAll } from './TodoController';

const mockCreateUser = jest.fn();
const mockGetAll = jest.fn();

const mockTodoController = jest.fn().mockReturnValue({
    create: mockCreateUser,
    getAll: mockGetAll
});
jest.mock('../services/TodoService.js', () => ({
    get TodoService() {
        return mockTodoController;
    },
}));

describe('TodoController', () => { 
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createTodo', () => {
        it('should be defined', () => {
            expect(create).toBeDefined();
            expect(create).toBeInstanceOf(Function);
        });

        it('throw return 400 if no title is provided', async () => {
            const req = {
                body: {
                    title: null,
                    description: 'description',
                    dueDate: '2021-09-10'
                }
            };

            const mockJson = jest.fn();
            const mockStatus = jest.fn().mockReturnValue({
                json: mockJson
            });
            const res = {
                status: mockStatus
            };

            await create(req, res);

            expect(mockStatus).toBeCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(400);

            expect(mockJson).toBeCalledTimes(1);
            expect(mockJson).toHaveBeenCalledWith({ message: 'Todos os campos são obrigatórios!' });
        });

        it('throw return 400 if no description is provided', async () => {
            const req = {
                body: {
                    title: 'title todo',
                    description: null,
                    dueDate: '2021-09-10'
                }
            };

            const mockJson = jest.fn();
            const mockStatus = jest.fn().mockReturnValue({
                json: mockJson
            });
            const res = {
                status: mockStatus
            };

            await create(req, res);

            expect(mockStatus).toBeCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(400);

            expect(mockJson).toBeCalledTimes(1);
            expect(mockJson).toHaveBeenCalledWith({ message: 'Todos os campos são obrigatórios!' });
        });

        it('throw return 400 if no dueDate is provided', async () => {
            const req = {
                body: {
                    title: 'title todo',
                    description: 'description todo',
                    dueDate: null
                }
            };

            const mockJson = jest.fn();
            const mockStatus = jest.fn().mockReturnValue({
                json: mockJson
            });
            const res = {
                status: mockStatus
            };

            await create(req, res);

            expect(mockStatus).toBeCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(400);

            expect(mockJson).toBeCalledTimes(1);
            expect(mockJson).toHaveBeenCalledWith({ message: 'Todos os campos são obrigatórios!' });
        });

        it('throw return 400 if no user is provided', async () => { 
            const req = {
                body: {
                    title: 'title todo',
                    description: 'description todo',
                    dueDate: '2021-09-10',
                    user: null
                }
            };

            const mockJson = jest.fn();
            const mockStatus = jest.fn().mockReturnValue({
                json: mockJson
            });
            const res = {
                status: mockStatus
            };

            await create(req, res);

            expect(mockStatus).toBeCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(400);

            expect(mockJson).toBeCalledTimes(1);
            expect(mockJson).toHaveBeenCalledWith({ message: `Cannot read properties of undefined (reading 'id')` });
        });

        it('throw return 201 if all fields are provided', async () => {
            mockCreateUser.mockResolvedValue({
                title: 'title todo',
                description: 'description todo',
                dueDate: '2021-09-10',
                user: '123'
                });

            const req = {
                body: {
                    title: 'title todo',
                    description: 'description todo',
                    dueDate: '2021-09-10',
                    user: '123'
                }
            };

            const mockJson = jest.fn();
            const mockStatus = jest.fn().mockReturnValue({
                json: mockJson
            });
            const res = {
                status: mockStatus
            };

            await create(req, res);

            expect(mockStatus).toBeCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(201);

            expect(mockJson).toBeCalledTimes(1);
            expect(mockJson).toHaveBeenCalledWith({ 
                title: 'title todo',
                description: 'description todo',
                dueDate: '2021-09-10',
                user: '123'
            });
        });
    });

    describe('getAllTodos', () => { 
        it('should be defined', () => {
            expect(getAll).toBeDefined();
            expect(getAll).toBeInstanceOf(Function);
        });
    });
});