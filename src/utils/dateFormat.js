const Formats = {
    formatUserBirthdate: (user) => {
      if (user.birthdate) {
        const date = new Date(user.birthdate);
        // Format the date as 'dd/MM/yyyy'
        let formattedDate = date.toLocaleDateString('en-GB'); // 'en-GB' gives dd/MM/yyyy format
  
        // Replace '/' with '-'
        formattedDate = formattedDate.replace(/\//g, '-');
  
        user.birthdate = formattedDate;
      }
      return user;
    },
  };
  
  module.exports = Formats;
  