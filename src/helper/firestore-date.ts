const formatFirestoreDate = (dateValue: any) => {
  if (typeof dateValue === 'string') {
    return new Date(dateValue).toLocaleDateString('de-DE');
  } else if (dateValue && dateValue._seconds) {
    const date = new Date(
      dateValue._seconds * 1000 + 
      (dateValue._nanoseconds || 0) / 1e6
    );
    return date.toLocaleDateString('de-DE');
  } else {
    return new Date(dateValue).toLocaleDateString('de-DE');
  }
};

export default formatFirestoreDate;