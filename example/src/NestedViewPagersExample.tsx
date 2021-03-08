import React, { useMemo } from 'react';
import { Image, StyleSheet, View, SafeAreaView, Text, Animated } from 'react-native';

import ViewPager from '@react-native-community/viewpager';

import { NavigationPanel } from './component/NavigationPanel';
import { useNavigationPanel } from './hook/useNavigationPanel';

const AnimatedViewPager = Animated.createAnimatedComponent(ViewPager);

export const NestedViewPagersExample = (): JSX.Element => {
  const { ref, ...navigationPanel } = useNavigationPanel();

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedViewPager
        ref={ref}
        style={styles.viewPager}
        initialPage={0}
        overdrag={navigationPanel.overdragEnabled}
        scrollEnabled={navigationPanel.scrollEnabled}
        onPageScroll={navigationPanel.onPageScroll}
        onPageSelected={navigationPanel.onPageSelected}
        onPageScrollStateChanged={navigationPanel.onPageScrollStateChanged}
        pageMargin={10}
        // Lib does not support dynamically orientation change
        orientation="horizontal"
        // Lib does not support dynamically transitionStyle change
        transitionStyle="scroll"
        showPageIndicator={navigationPanel.dotsEnabled}
      >
        {useMemo(
          () =>
            navigationPanel.pages.map((page) => (
              <View key={page.key} style={page.style} collapsable={false}>
                <AnimatedViewPager style={styles.innerViewPager}>
                  {['one', 'two', 'three'].map((text) => (
                    <View
                      key={text}
                      style={styles.innerPage}
                      collapsable={false}
                    >
                      <Text>nested page {text}</Text>
                    </View>
                  ))}
                </AnimatedViewPager>
                <Image style={styles.image} source={page.imgSource} />
              </View>
            )),
          [navigationPanel.pages]
        )}
      </AnimatedViewPager>
      <NavigationPanel {...navigationPanel} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 200,
    padding: 20,
  },
  viewPager: {
    flex: 1,
  },
  innerViewPager: {
    width: 300,
    height: 100,
    borderWidth: 1,
    borderColor: 'green',
  },
  innerPage: {
    width: 300,
    height: 100,
    backgroundColor: 'orange',
  },
});
