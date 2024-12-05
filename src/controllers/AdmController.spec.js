import { updateRole, getUserByIdd, getAllUserss, getAll } from './AdmController.js';

jest.mock('../services/UserService.js');

const mockUpdateRole = jest.fn();
const mockGetUserByIdd = jest.fn();
const mockGetAllUserss = jest.fn();
const mockGetAll = jest.fn();

const mockAdmService = jest.fn().mockReturnValueOnce({
    updateRole: mockUpdateRole,
    getUserById: mockGetUserByIdd,
    getAllUsers: mockGetAllUserss,
    getAll: mockGetAll
});

jest.mock('../services/AdmService.js', () => ({
    get mockAdmService() {
        return mockAdmService;
    },
}));

describe('AdmController', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });
    
    describe('updateRole', () => {

        it('should be defined', () => { 
            expect(updateRole).toBeDefined();
            expect(updateRole).toBeInstanceOf(Function);
        });

        it('Should throw return error if no id is provided', async () => {
            const req = {
                params: { id: null },
                body: { role: 5150 }
            };

            const json = jest.fn();
            const status = jest.fn().mockReturnThis();
            const res = {
                status,
                json
            };
        
            await updateRole(req, res);

            expect(res.status).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "Os campos são obrigatórios."
            });
        });

        it('Should throw return error if no role is provided', async () => {
            const req = {
                params: { id: 12345 },
                body: { role: null }
            };

            const json = jest.fn();
            const status = jest.fn().mockReturnThis();
            const res = {
                status,
                json,
                logger: jest.fn()
            };

            await updateRole(req, res);

            expect(res.status).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(400);

            expect(res.json).toHaveBeenCalledWith({
                message: "Os campos são obrigatórios."
            })
        });

        it('Should throw return error authorization is no provided', async () => {
            const req = {
                params: { id: 12345 },
                body: { role: 5150 },
                headers: { authorization: null }
            };

            const json = jest.fn();
            const status = jest.fn().mockReturnThis();
            const res = {
                status,
                json,
                logger: jest.fn()
            };

            await updateRole(req, res);

            expect(res.status).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(400);

            expect(res.json).toHaveBeenCalledWith({
                message: "Não autorizado"
            })
        });
        
        it('Should return status 200 success', async () => {
            mockUpdateRole.mockResolvedValueOnce({
                id: 12345,
                role: 5150
            });

            const req = {
                params: { id: 12345 },
                body: { role: 5150 },
                headers: { authorization: "approved" }
            };

            const json = jest.fn();
            const status = jest.fn().mockReturnThis();
            const res = {
                status,
                json
            };

            await updateRole(req, res);

            expect(res.status).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(200);

            expect(res.json).toHaveBeenCalledTimes(1),
            expect(res.json).toHaveBeenCalledWith({
                id: 12345,
                role: 5150
            })
        });
    });

    describe('getUserById', () => { 
        it('should be defined', () => { 
            expect(getUserByIdd).toBeDefined();
            expect(getUserByIdd).toBeInstanceOf(Function);
        });

        it('Should throw return error if no id is provided', async () => {
            
            const req = {
                params: { id: null }
            };

            const json = jest.fn();
            const status = jest.fn().mockReturnThis();
            const res = {
                status,
                json
            };
        
            await getUserByIdd(req, res);

            expect(res.status).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Os campos são obrigatórios."
            });
        });

        it('Should throw return error if authorization is no provided', async () => {
            
            const req = {
                params: { id: 12345 },
                headers: { authorization: null }
            };

            const json = jest.fn();
            const status = jest.fn().mockReturnThis();
            const res = {
                status,
                json
            };
        
            await getUserByIdd(req, res);

            expect(res.status).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: "Não autorizado"
            });
        });

        it('Should return status 200 success', async () => { 
            const req = {
                params: { id: 12345 },
                headers: { authorization: "approved"}
            };

            const json = jest.fn();
            const status = jest.fn().mockReturnThis();
            const res = {
                status,
                json
            };

            await getUserByIdd(req, res);

            expect(res.status).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });

    describe('getAllUsers', () => { 
        it('should be defined', () => {
            expect(getAllUserss).toBeDefined();
            expect(getAllUserss).toBeInstanceOf(Function);
        });

        it('should throw error if authorization is no provided', async () => {
            const req = {
                headers: { authorization: null }
            };
            const json = jest.fn();
            const status = jest.fn().mockReturnThis();
            const res = {
                status,
                json
            };

            await getAllUserss(req, res);

            expect(res.status).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('should return status 200 success', async () => {
            const req = {
                headers: {
                    authorization: "approved"
                }
            }
            const json = jest.fn();
            const status = jest.fn().mockReturnThis();
            const res = {
                status,
                json
            };

            await getAllUserss(req, res);

            expect(res.status).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });

    describe('getAllTodos', () => {
        it('should be defined', () => {
            expect(getAll).toBeDefined();
            expect(getAll).toBeInstanceOf(Function);
        });

        it('should throw error if authorization is no provided', async () => {
            const req = {
                headers: { authorization: null }
            };
            const json = jest.fn();
            const status = jest.fn().mockReturnThis();
            const res = {
                status,
                json
            };

            await getAll(req, res);

            expect(res.status).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('should return status 200 success', async () => { 
            const req = {
                headers: { authorization: "approved" }
            };
            const json = jest.fn();
            const status = jest.fn().mockReturnThis();
            const res = {
                status,
                json
            };

            await getAll(req, res);

            expect(res.status).toHaveBeenCalledTimes(1)
        });
    });

});