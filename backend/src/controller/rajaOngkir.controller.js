import axios from "axios";

export const getProvinces = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.RAJAONGKIR_BASE_URL}/province`,
      {
        headers: { key: process.env.RAJAONGKIR_API_KEY },
      }
    );

    const provinces = response.data.rajaongkir.results;
    res.json(provinces);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data provinsi", error });
  }
};

export const getCities = async (req, res) => {
  const { province_id } = req.query;

  try {
    const response = await axios.get(
      `${process.env.RAJAONGKIR_BASE_URL}/city?province=${province_id}`,
      {
        headers: { key: process.env.RAJAONGKIR_API_KEY },
      }
    );

    const cities = response.data.rajaongkir.results;
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data kota", error });
  }
};

export const getCosts = async (req, res) => {
  const { destination, weight } = req.body;

  try {
    const response = await axios.post(
      `${process.env.RAJAONGKIR_BASE_URL}/cost`,
      new URLSearchParams({
        origin: "133",
        destination,
        weight,
        courier: "jne",
      }),
      {
        headers: {
          key: process.env.RAJAONGKIR_API_KEY,
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    const costs = response.data.rajaongkir.results;
    res.json(costs);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data tarif", error });
  }
};
