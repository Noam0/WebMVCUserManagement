const Validators = {
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

   isValidPassword: (password) => {
        if (typeof password !== 'string') {
          return false;
        }
        
        // Check for at least 5 characters and at least one digit
        const hasMinLength = password.length >= 5;
        const hasDigit = /\d/.test(password);
      
        return hasMinLength && hasDigit;
      },

      isValidBirthdate: (birthdate) => {
        console.log("Validating birthdate:", birthdate);
        const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
      
        if (!dateRegex.test(birthdate)) {
          console.log("Birthdate format invalid:", birthdate);
          return false;
        }
      
        const [day, month, year] = birthdate.split('-').map(Number);
        console.log("Parsed day:", day, "month:", month, "year:", year);
      
        if (month < 1 || month > 12) {
          console.log("Invalid month:", month);
          return false;
        }
      
        const daysInMonth = new Date(year, month, 0).getDate(); // Fixed month adjustment
        console.log("Days in month:", daysInMonth);
      
        if (day < 1 || day > daysInMonth) {
          console.log("Invalid day:", day);
          return false;
        }
      
        return true;
      },
};

module.exports = Validators;

  
 