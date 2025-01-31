import { connect } from 'mongoose';
const connectToDB = async () => {
  try {
    await connect('your_connection_string', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Connection failed, retrying...', error);
    setTimeout(connectToDB, 5000); // Retry after 5 seconds
  }
};

connectToDB();
