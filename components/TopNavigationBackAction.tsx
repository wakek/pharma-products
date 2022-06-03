import { useNavigation } from "@react-navigation/native";
import { EvaProp, Icon, Text, TopNavigationAction, withStyles } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";

export type TopNavigationBackActionProps = {
    title: string,
    eva?: EvaProp,
}

const _TopNavigationBackAction = ({ title, eva }: TopNavigationBackActionProps) => {
    const _navigation = useNavigation();

    return (
        <TopNavigationAction
            icon={(props) => (
                // row with icon and title
                <View style={eva?.style?.rowContainer}>
                    <Icon {...props} name='arrow-back' />
                    <Text category='s1' style={eva?.style?.title}>{title}</Text>
                </View>
            )}
            onPress={() => _navigation.goBack()}
        />
    );
}

const TopNavigationBackAction = withStyles(_TopNavigationBackAction, theme => ({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Nunito-Bold',
        marginLeft: 8,
    }
}));

export default TopNavigationBackAction;

