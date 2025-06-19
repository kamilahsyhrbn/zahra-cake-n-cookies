export const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

export const formatDate = (date) => {
  const currentDate = new Date();
  const createdAtDate = new Date(date);

  const timeDifferenceInSeconds = Math.floor(
    (currentDate - createdAtDate) / 1000
  );
  const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
  const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
  const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

  if (timeDifferenceInDays > 1) {
    return createdAtDate.toLocaleDateString("id-ID", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } else if (timeDifferenceInDays === 1) {
    return "1 hari yang lalu";
  } else if (timeDifferenceInHours >= 1) {
    return `${timeDifferenceInHours} jam yang lalu`;
  } else if (timeDifferenceInMinutes >= 1) {
    return `${timeDifferenceInMinutes} menit yang lalu`;
  } else {
    return "Baru saja";
  }
};
