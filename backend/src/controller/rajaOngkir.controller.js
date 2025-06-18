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
