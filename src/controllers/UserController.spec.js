import { createUser, getAllUsers, getUserById, loginUser } from './UserController';

const mockCreate = jest.fn();
const mockLoginUser = jest.fn();
const mockFind = jest.fn();
const mockFindById = jest.fn();

const mockUserService = jest.fn().mockReturnValue({
    create: mockCreate,
    loginUser: mockLoginUser,
    find: mockFind,
    findById: mockFindById
});
jest.mock('../services/UserService.js', () => ({
    get UserService() {
        return mockUserService;
    },
}));

describe('UserController', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser', () => {

        it('should be defined', () => {
            expect(createUser).toBeDefined();
            expect(createUser).toBeInstanceOf(Function);
        })

        it('should throw error if name is not provided', async () => {
            const req = {
                body: {
                    name: null,
                    email: 'andre@andre.com.br',
                    password: '123456'
                }
            };

            const mockJson = jest.fn();
            const mockStatus = jest.fn().mockReturnValue({
                json: mockJson
            });

            const res = {
                status: mockStatus
            };

            await createUser(req, res);

            expect(mockStatus).toBeCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(400);

            expect(mockJson).toBeCalledTimes(1);
            expect(mockJson).toHaveBeenCalledWith({ message: 'Todos os campos são obrigatórios!' });
        });

        it('should throw error if email is not provided', async () => {

            const req = {
                body: {
                    name: 'Andre',
                    email: null,
                    password: '123456'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await createUser(req, res);

            expect(res.status).toBeCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);

            expect(res.json).toBeCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({ message: 'Todos os campos são obrigatórios!' });
        });

        it('should throw error if password is not provided', async () => {
            const req = {
                body: {
                    name: 'Andre',
                    email: 'andre@andre.com.br',
                    password: null
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await createUser(req, res);

            expect(res.status).toBeCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);

            expect(res.json).toBeCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({ message: 'Todos os campos são obrigatórios!' });
        });

        it('should create new user', async () => {

            mockCreate.mockResolvedValueOnce({
                name: 'Andre',
                email: 'andre@andre.com.br',
                password: '123456'
            });

            const req = {
                body: {
                    name: 'Andre',
                    email: 'andre@andre.com.br',
                    password: '123456'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await createUser(req, res);

            expect(res.status).toBeCalledTimes(1);
            expect(res.json).toBeCalledTimes(1);
        });
    });

    describe('login', () => {
        it('should be defined', () => {
            expect(loginUser).toBeDefined();
            expect(loginUser).toBeInstanceOf(Function);
        });

        it('should throw error if email is not provided', async () => {
            const req = {
                body: {
                    email: null,
                    password: '123456'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await loginUser(req, res);

            expect(res.status).toBeCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);

            expect(res.json).toBeCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({ message: 'Todos os campos são obrigatórios!' });
        });

        it('should throw error if password is not provided', async () => {
            const req = {
                body: {
                    email: 'andre@andre.com.br',
                    password: null
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await loginUser(req, res);

            expect(res.status).toBeCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);

            expect(res.json).toBeCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({ message: 'Todos os campos são obrigatórios!' });
        });

        it('should login user', async () => {
            mockLoginUser.mockResolvedValueOnce({
                email: 'andre@andre.com.br',
                password: '123456'
            });

            const req = {
                body: {
                    email: 'andre@andre.com.br',
                    password: '123456'
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await loginUser(req, res);

            expect(res.status).toBeCalledTimes(1);

        });
    });
        
    describe('getAllUsers', () => {
        it('should be defined', () => {
            expect(getAllUsers).toBeDefined();
            expect(getAllUsers).toBeInstanceOf(Function);
        });
            
        it('should throw error 500 on method all users', async () => {
            // mockFind.mockReturnValueOnce([
            //     {
            //         name: 'Andre',
            //         email: 'andre@andre.com.br',
            //     },
            // ]);

            const req = {
                body: {
                    name: 'Andre',
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await getAllUsers(req, res);

            expect(res.status).toBeCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);

            expect(res.json).toBeCalledTimes(1);
        });
    });

    describe('getUserById', () => { 
        it('should be defined', () => {
            expect(getUserById).toBeDefined();
            expect(getUserById).toBeInstanceOf(Function);
        });

        it('should throw error 500 on method get user by id', async () => {
            
            const req = {
                params: {
                    id: null,
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await getUserById(req, res);

            expect(res.status).toBeCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);

            expect(res.json).toBeCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({ error: 'O campo id é obrigatório!' });
        });

        it('should get user by id', async () => {
            mockFindById.mockReturnValueOnce({
                id: "12g2713g2g3",
                name: 'Andre',
                email: 'andre@andre.com.br'
            });

            const req = {
                params: {
                    id: "12g2713g2g3",
                }
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            
            await getUserById(req, res);

            expect(res.status).toBeCalledTimes(1);
            expect(res.json).toBeCalledTimes(1);
        });
    });
 });