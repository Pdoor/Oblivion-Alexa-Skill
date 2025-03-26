import axios from 'axios';

export default async (req, res) => {
  try {
    const { data } = await axios.get(
      'https://www.bungie.net/Platform/GroupV2/5234013/Members/',
      {
        headers: {
          'X-API-Key': '6101a6a344e24c1e89f9aab5e120642c',
          'User-Agent': 'OblivionAlexaSkill/1.0'
        }
      }
    );

    const online = data.Response.results
      .filter(m => m.isOnline)
      .map(m => ({
        name: m.destinyUserInfo.bungieGlobalDisplayName || m.destinyUserInfo.displayName,
        class: 'Guardiano' // Puoi arricchire questo dato dopo
      }));

    res.status(200).json({ online });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};