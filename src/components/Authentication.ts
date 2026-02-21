import { modalManager } from './ModalManager';
import { dashboardManager } from './Dashboard';
import { toast } from './Toast';

interface AuthCredentials {
  email: string;
  password: string;
}

class Authentication {
  private readonly ADMIN_EMAIL = 'admin@linaihenna.com';
  private readonly ADMIN_PASSWORD = 'admin123';

  init(): void {
    const loginForm = document.getElementById('loginForm') as HTMLFormElement;
    if (loginForm) {
      loginForm.addEventListener('submit', this.handleLogin.bind(this));
    }
  }

  private async handleLogin(e: Event): Promise<void> {
    e.preventDefault();

    const emailInput = document.getElementById('loginEmail') as HTMLInputElement;
    const passwordInput = document.getElementById('loginPassword') as HTMLInputElement;

    if (!emailInput || !passwordInput) return;

    const credentials: AuthCredentials = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    if (this.validateCredentials(credentials)) {
      modalManager.close('login');
      dashboardManager.login();
      toast.success('Welcome back, Admin!');
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  }

  private validateCredentials(credentials: AuthCredentials): boolean {
    return (
      credentials.email === this.ADMIN_EMAIL &&
      credentials.password === this.ADMIN_PASSWORD
    );
  }

  logout(): void {
    dashboardManager.logout();
    toast.success('Logged out successfully');
  }
}

export const auth = new Authentication();
