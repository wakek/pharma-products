import { EvaProp, Layout, Text, withStyles } from '@ui-kitten/components';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Strings } from '../constants/Strings';
import { RootTabScreenProps } from '../types';


interface HomeProps {
  navigation: RootTabScreenProps<'TabOne'>,
  eva: EvaProp,
}

const _Home = observer(({ navigation, eva }: HomeProps) => {
  const { bookingsStore } = useRootStore();

  React.useEffect(() => {
    LoggerService.logComponentMount(tag);

    const pendingBookings = bookingsStore.getBookings.filter(
        booking => booking.stage !== BookingStage.COMPLETED && booking.stage !== BookingStage.CANCELLED,
    );
    const canceledBookings = bookingsStore.getBookings.filter(
        booking => booking.stage === BookingStage.CANCELLED,
    );
    const completedBookings = bookingsStore.getBookings.filter(
        booking => booking.stage === BookingStage.COMPLETED,
    );

    setSectionedPendingBookings(sectionBookings(pendingBookings));
    setSectionedCanceledBookings(sectionBookings(canceledBookings));
    setSectionedCompletedBookings(sectionBookings(completedBookings));

    return () => {
        LoggerService.logComponentUnmount(tag);
    };
}, [bookingsStore.bookings, bookingsStore.isLoading]);

  return (
    <Layout style={eva.style?.container}>
      <Text style={eva.style?.h6} category='h3'>
        {Strings.EN.Our_Products}
      </Text>

    </Layout>
  );
});

const Home = withStyles(_Home, theme => ({
  container: {
    flex: 1,
    padding: 20,
  },
  h6: {
    marginTop: 30,
    marginBottom: 5,
    fontFamily: 'Nunito-ExtraBold',
  }
}));

export default Home;