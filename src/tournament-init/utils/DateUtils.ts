export const parseDateFromIsoString = (isoString: string) => {
    if (!isoString) return '';
    // format to yyyy-MM-dd 
    const date = new Date(isoString);
    const locale = date.toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' });
  
    return `${locale.split('.')[2]}-${locale.split('.')[1]}-${locale.split('.')[0]}`
  }
  
  
  export const parseTimeFromIsoString = (time: string) => {
    if (!time) return '';
    const localeTime = new Date(time).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    return localeTime;
  }