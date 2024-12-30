import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { login, password } = req.body;

    try {
      const response = await axios.post('../api/auth', {
        login,
        password,
      });

      if (response.data.success) {
        // Safely extract the response data to avoid KeyError
        const userId = response.data.user_id || null;
        const userName = response.data.name || null;
        const sessionId = response.data.session_id || null;

        if (!userId || !userName || !sessionId) {
          throw new Error('Incomplete data received from the server');
        }

        // Return session data to the client
        res.status(200).json({
          success: true,
          userId,
          userName,
          sessionId,
        });
      } else {
        res.status(401).json({ success: false, error: 'Invalid login credentials' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
