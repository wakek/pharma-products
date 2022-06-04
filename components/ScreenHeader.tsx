import { EvaProp, withStyles } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { NunitoText } from "./StyledText";

export type ScreenHeaderProps = {
    title: string,
    subtitle?: string,
    eva?: EvaProp,
}

const _ScreenHeader = ({ title, subtitle, eva }: ScreenHeaderProps) => {
    return (
        <View style={eva?.style?.container}>
            <View style={eva?.style?.header}>
                <NunitoText
                    style={eva?.style?.title}
                    weight='extraBold'
                    category='h3'
                    status='primary'
                >
                    {title}
                </NunitoText>
                {subtitle && (
                    <NunitoText
                        style={eva?.style?.subtitle}
                        weight='regular'
                    >
                        {subtitle}
                    </NunitoText>
                )}
            </View>
        </View>
    );
}

const ScreenHeader = withStyles(_ScreenHeader, theme => ({
    container: {
        flexDirecton: 'column',
        alignItems: 'flex-start',
    },
    title: {
        marginBottom: 5,
    },
    subtitle: {
        marginBottom: 20,
        opacity: 0.7,
        fontSize: 17,
    },
}));

export default ScreenHeader;