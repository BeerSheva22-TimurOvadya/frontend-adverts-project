
import EmployeesService from '../service/crud/EmployeesService';
import EmployeesServiceRest from '../service/crud/EmployeesServiceRest';


// export const authService: AuthService = new AuthServiceJwt('http://localhost:3500/login'); для JSON servera

// export const authService: AuthService = new AuthServiceFake();



export const employeesService: EmployeesService = new EmployeesServiceRest(
    'http://localhost:3500/employees',
); 

// export const employeesService: EmployeesService = new EmployeesServiceFire();
