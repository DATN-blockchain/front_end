const getRole = (key: string)=> {
  switch (key) {
    case "manufacturer":
      
      return "Nhà máy chế biến";
    case "farmer":

      return "Nông dân";
    
    case "seedling_company":

      return "Công ty cây giống";

    case "MANUFACTURER":

      return "Nhà máy chế biến";
    
    case "FARMER":

      return "Nông dân";

    case "SEEDLING_COMPANY":

      return "Công ty hạt giống";
  
    default:
      return "MEMBER";
  }
}
export default getRole