import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
  View
} from 'react-native';
import { useSelector } from 'react-redux';
import { BookPreview, Check, DownArrow, PlayWhite, CloseImage } from '../../../assets/svgs';
import { useLocalization } from '../../../hooks/useLocalization';
import { colors } from '../../../theme/Colors';
import Fonts from '../../../theme/Fonts';
import { units } from '../../../theme/Units';
import TopMenu from '../../components/TopMenu';
import QuizQuestions from './components/QuizQuestions';
import ImageViewer from 'ko-react-native-image-zoom-viewer';
import CustomModal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import WebView from 'react-native-webview';

const books = [
  { id: 1, quizId: "c4fa0441-aa17-4c63-b0ba-59f7921a7e53", bookName: "Beginner / Level 2 / Unit 1", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 2, quizId: "0db486d5-d534-4262-9099-0a00dd997249", bookName: "Beginner / Level 2 / Unit 2", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 3, quizId: "f2eb5f75-6d2e-441a-ae55-52128b05b5f6", bookName: "Beginner / Level 2 / Unit 3", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 4, quizId: "f1d285c5-ad25-42ef-9a28-474985f21142", bookName: "Beginner / Level 2 / Unit 4", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 5, quizId: "e0598ecb-6b54-4666-94f8-f42a8c2dbd89", bookName: "Beginner / Level 2 / Unit 5", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 6, quizId: "4cf8d712-3a7b-430a-bbc3-f4703b17e79a", bookName: "Beginner / Level 2 / Unit 6", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 7, quizId: "7d0e7d0e-7d0e-7d0e-7d0e-7d0e7d0e7d0e", bookName: "Beginner / Level 2 / Unit 7", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: true },
  { id: 8, quizId: "8d0e8d0e-8d0e-8d0e-8d0e-8d0e8d0e8d0e", bookName: "Beginner / Level 2 / Unit 8", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 9, quizId: "9d0e9d0e-9d0e-9d0e-9d0e-9d0e9d0e9d0e", bookName: "Beginner / Level 2 / Unit 9", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 10, quizId: "ad10e10e-ad10-10e1-10e1-ad10e10e10e1", bookName: "Beginner / Level 2 / Unit 10", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 11, quizId: "bd11e11e-bd11-11e1-11e1-bd11e11e11e1", bookName: "Beginner / Level 2 / Unit 11", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: true },
  { id: 12, quizId: "cd12e12e-cd12-12e1-12e1-cd12e12e12e1", bookName: "Beginner / Level 2 / Unit 12", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: true },
  { id: 13, quizId: "dd13e13e-dd13-13e1-13e1-dd13e13e13e1", bookName: "Beginner / Level 2 / Unit 13", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 14, quizId: "ed14e14e-ed14-14e1-14e1-ed14e14e14e1", bookName: "Intermediate / Level-4 / Unit-14", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 15, quizId: "fd15e15e-fd15-15e1-15e1-fd15e15e15e1", bookName: "Beginner / Level 2 / Unit 15", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 16, quizId: "1d16e16e-1d16-16e1-16e1-1d16e16e16e1", bookName: "Beginner / Level 2 / Unit 16", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: true },
  { id: 17, quizId: "2d17e17e-2d17-17e1-17e1-2d17e17e17e1", bookName: "Beginner / Level 2 / Unit 17", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 18, quizId: "3d18e18e-3d18-18e1-18e1-3d18e18e18e1", bookName: "Beginner / Level 2 / Unit 18", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 19, quizId: "4d19e19e-4d19-19e1-19e1-4d19e19e19e1", bookName: "Beginner / Level 2 / Unit 19", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S3/191.jpg", isCompleted: true },
  { id: 20, quizId: "5d20e20e-5d20-20e1-20e1-5d20e20e20e1", bookName: "Beginner / Level 2 / Unit 20", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: true },
  { id: 21, quizId: "6d21e21e-6d21-21e1-21e1-6d21e21e21e1", bookName: "Beginner / Level 2 / Unit 21", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 22, quizId: "7d22e22e-7d22-22e1-22e1-7d22e22e22e1", bookName: "Beginner / Level 2 / Unit 22", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: true },
  { id: 23, quizId: "8d23e23e-8d23-23e1-23e1-8d23e23e23e1", bookName: "Beginner / Level 2 / Unit 23", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 24, quizId: "9d24e24e-9d24-24e1-24e1-9d24e24e24e1", bookName: "Beginner / Level 2 / Unit 24", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 25, quizId: "ad25e25e-ad25-25e1-25e1-ad25e25e25e1", bookName: "Beginner / Level 2 / Unit 25", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 26, quizId: "bd26e26e-bd26-26e1-26e1-bd26e26e26e1", bookName: "Beginner / Level 2 / Unit 26", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 27, quizId: "cd27e27e-cd27-27e1-27e1-cd27e27e27e1", bookName: "Beginner / Level 2 / Unit 27", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: true },
  { id: 28, quizId: "dd28e28e-dd28-28e1-28e1-dd28e28e28e1", bookName: "Beginner / Level 2 / Unit 28", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 29, quizId: "ed29e29e-ed29-29e1-29e1-ed29e29e29e1", bookName: "Beginner / Level 2 / Unit 29", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 30, quizId: "fd30e30e-fd30-30e1-30e1-fd30e30e30e1", bookName: "Beginner / Level 2 / Unit 30", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: true },
];

export default function Quiz({ navigation }) {

  const { language } = useSelector(state => state.locale);
  const strings = useLocalization();

  const parts = strings.quiz.answered_quiz.split('#check#');

  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [startIdx, setStartIdx] = useState(0);
  const [selectedBookUrl, setSelectedBookUrl] = useState("");
  const [imageModalVisibility, setImageModalVisibility] = useState(false);
  const [url, setUrl] = useState(null);
  const [animationVisible, setAnimationVisible] = useState(true);
  const [bookName, setBookName] = useState(null);

  const animation = require('../../../assets/animations/zoom.json');

  const ITEMS_PER_PAGE = 5;
  const INITIAL_START_IDX = 14;

  const visibleBooks = books.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const Content = () => {
    return visibleBooks.map((book, index) => {
      return (
        <View key={index}>
          {index !== 0 && (
            <View
              style={styles.seperator}
            />
          )}
          <View key={index} style={styles.contentContainer}>
            <View style={[
              styles.textContainer,
              {
                gap: book.id == INITIAL_START_IDX ? 4 : 0
              }
            ]}>
              <Text style={[
                styles.text,
                {
                  fontWeight: book.id == INITIAL_START_IDX ? 'bold' : 'normal'
                }
              ]}>{book.bookName}</Text>
            </View>
            <View style={styles.rightContainer}>
              {book.isCompleted && (
                <Check width="20" height="20" />
              )}
              <TouchableOpacity onPress={() => {
                setSelectedBookUrl(book.bookLink);
                setImageModalVisibility(true);
              }} >
                <BookPreview width="24" height="24" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.playButtonContainer}
                onPress={() => setSelectedQuiz(book)}
              >
                <PlayWhite
                  width={units.height / 48}
                  height={units.height / 48}
                  marginHorizontal={units.height / 110}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    });
  };

  // Yukarı ok tıklanırsa çalışacak işlev
  const handleUpPress = () => {
    let newStartIdx = startIdx - ITEMS_PER_PAGE;

    if (newStartIdx < 0) {
      newStartIdx = 0;
    }

    setStartIdx(newStartIdx);
  };

  // Aşağı ok tıklanırsa çalışacak işlev
  const handleDownPress = () => {
    const maxStartIdx = Math.max(0, books.length - ITEMS_PER_PAGE);
    let newStartIdx = startIdx + ITEMS_PER_PAGE;

    if (newStartIdx > maxStartIdx) {
      newStartIdx = maxStartIdx;
    }

    setStartIdx(newStartIdx);
  };

  // Görüntülenen öğeleri hesaplar ve eksik öğeleri doldurur
  const calculateShowItems = () => {
    let displayedItems = books.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    if (displayedItems.length < ITEMS_PER_PAGE) {
      const missingItemsCount = ITEMS_PER_PAGE - displayedItems.length;
      let missingStartIdx = startIdx - missingItemsCount;

      if (missingStartIdx < 0) {
        missingStartIdx = 0;
      }

      if (missingStartIdx + ITEMS_PER_PAGE > books.length) {
        missingStartIdx = Math.max(0, books.length - ITEMS_PER_PAGE);
      }

      displayedItems = books.slice(missingStartIdx, missingStartIdx + ITEMS_PER_PAGE);
    }

    return displayedItems;
  };

  const INJECTEDJAVASCRIPT =
    "const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.7'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); ";

  // İlk yükleme veya ITEMS_PER_PAGE değiştiğinde çalışır
  useEffect(() => {
    // Seçilen öğenin indeksini bulur
    let selectedItemIndex = books.findIndex((book) => book.id === INITIAL_START_IDX);

    if (selectedItemIndex !== -1) {
      // Yeni başlangıç indeksi hesaplanır
      const newStartIdx = Math.max(0, selectedItemIndex - Math.floor(ITEMS_PER_PAGE / 2));
      setStartIdx(newStartIdx);
    } else {
      setStartIdx(0);
    }
  }, [books, ITEMS_PER_PAGE]);

  useEffect(() => {
    if (Object.keys(selectedQuiz).length > 0) {
      setBookName(bookName => selectedQuiz.bookName);
    }
  }, [selectedQuiz])

  // Görüntülenecek öğeleri hesaplar
  const showItems = calculateShowItems();
  // Yukarı Çık butonunun görünüp görünmeyeceğine karar verir. Eğer ilk öğe görüntüleniyorsa yukarı çık butonu görünmez.
  let showUpButton = showItems.includes(books[0]) || false;
  // Aşağıya In butonunun görünüp görünmeyeceğine karar verir. Eğer son öğe görüntüleniyorsa yukarı çık butonu görünmez.
  let showDownButton = showItems.includes(books[books.length - 1]) || false;

  return (
    <>
      <SafeAreaView style={styles.statusBarColor}></SafeAreaView>
      <StatusBar backgroundColor={colors.WHITE} />
      <View style={styles.container}>
        {/* top menu */}
        <TopMenu
          title={strings.quiz.top_title}
          onPressBack={() => {
            navigation.dispatch(CommonActions.goBack());
          }}
          onPressMenu={() => {
            navigation.toggleDrawer();
          }}
        />
        <ScrollView
          style={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}>
          {Object.keys(selectedQuiz).length === 0 && (
            <>
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                  Ümumi İngilis Dili / 21.30 / 10 dəq
                </Text>
              </View>
              <View style={styles.quizContainer}>
                <Text style={styles.title}>{strings.quiz.title}</Text>
                <Text style={styles.quizHeaderText}>
                  {strings.quiz.description}
                </Text>
                {books ?
                  <>
                    <TouchableOpacity
                      style={styles.arrowContainer}
                      onPress={() => { !showUpButton && handleUpPress() }}
                    >
                      <DownArrow style={[styles.rotate,
                      {
                        opacity: showUpButton ? 0 : 100
                      }]}
                        width="18"
                        height="18"
                      />
                    </TouchableOpacity>

                    <Content />

                    <TouchableOpacity
                      style={[styles.arrowContainer,
                      {
                        marginBottom: 20
                      }]}
                      onPress={() => { !showDownButton && handleDownPress() }}
                    >
                      <DownArrow style={{ opacity: showDownButton ? 0 : 100 }}
                        width="18"
                        height="18"
                      />
                    </TouchableOpacity>
                  </>
                  : null}
              </View>
              <Text style={styles.bottomMessage}>
                {parts[0]}
                <Check width={20} height={20} />
                {parts[1]}
              </Text>
            </>
          )}
          {Object.keys(selectedQuiz).length > 0 && (
            <QuizQuestions setSelectedQuiz={setSelectedQuiz} bookName={bookName} />
          )}
        </ScrollView>

        {/* image modal */}
        {Platform.OS == 'ios' ? (
          <CustomModal
            style={{ margin: 0 }}
            isVisible={imageModalVisibility}
            transparent={true}
            onBackdropPress={() => {
              setImageModalVisibility(false);
            }}>
            <View style={styles.modal}>
              <TouchableOpacity
                onPress={() => {
                  setImageModalVisibility(false);
                  setAnimationVisible(true);
                }}
                style={styles.closeImage}>
                <CloseImage
                  width={units.height / 22}
                  height={units.height / 22}
                />
              </TouchableOpacity>
              <WebView
                style={styles.webview}
                source={{ uri: selectedBookUrl }}
                injectedJavaScript={INJECTEDJAVASCRIPT}
              />
              {animationVisible && (
                <View style={styles.overlay}>
                  <LottieView
                    style={styles.animation}
                    autoPlay
                    loop={false}
                    source={animation}
                    onAnimationFinish={() => setAnimationVisible(false)}
                  />
                </View>
              )}
            </View>
          </CustomModal>
        ) : (
          <Modal visible={imageModalVisibility} transparent={true}>
            <TouchableOpacity
              onPress={() => {
                setImageModalVisibility(false);
                setAnimationVisible(true);
              }}
              style={styles.closeImageAndroid}>
              <CloseImage
                width={units.height / 22}
                height={units.height / 22}
              />
            </TouchableOpacity>
            {/* resmin üstüne index görünmemesi için node_modules/react-native-image-zoom-viewer/built/image-viewer.style.js dosyasında countText'e display:"none" ekle. */}
            <ImageViewer
              imageUrls={[{ selectedBookUrl }]}
              backgroundColor="rgba(0, 0, 0, 0.6)"
              saveToLocalByLongPress={false}
            />
            {animationVisible && (
              <View style={styles.overlay}>
                <LottieView
                  style={styles.animation}
                  autoPlay
                  loop={false}
                  source={animation}
                  onAnimationFinish={() => setAnimationVisible(false)}
                />
              </View>
            )}
          </Modal>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: units.width,
  },
  scrollViewContainer: {
    marginHorizontal: units.width / 36,
    marginTop: units.width / 24,
    marginBottom: units.height / 3.4
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size(18),
    color: colors.BLUE,
    textAlign: 'center',
    marginHorizontal: units.width / 10,
    marginTop: units.height / 72,
    marginBottom: units.height / 30
  },
  headerContainer: {
    backgroundColor: colors.DROPDOWN_PINK,
    borderRadius: units.height / 72,
    marginBottom: units.height / 48
  },
  headerText: {
    marginVertical: units.height / 48,
    marginHorizontal: units.width / 12,
    fontSize: Fonts.size(14),
    fontFamily: Fonts.type.bold,
    color: colors.BLACK,
    textAlign: 'center'
  },
  quizContainer: {
    backgroundColor: colors.WHITE,
    borderRadius: units.height / 72,
    paddingHorizontal: units.height / 72,
    borderWidth: units.height / 500,
    borderColor: colors.SOFT_PINK,
    marginBottom: units.height / 36
  },
  quizHeaderText: {
    marginBottom: units.height / 48,
    marginHorizontal: units.width / 36,
    fontSize: Fonts.size(14),
    fontFamily: Fonts.type.bold,
    color: colors.BLACK,
    textAlign: 'center'
  },
  text: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size(14),
    color: colors.BLACK,
    marginVertical: units.height / 45,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  seperator: {
    marginHorizontal: units.width / 25,
    height: units.height / 500,
    backgroundColor: colors.SOFT_PINK
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  rightContainer: {
    marginRight: units.width / 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  playButtonContainer: {
    backgroundColor: colors.PINK,
    borderRadius: 10,
    borderColor: colors.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: units.height / 144,
    paddingHorizontal: units.width / 60,
  },
  arrowContainer: {
    alignItems: 'center',
  },
  rotate: {
    transform: [{ rotate: '180deg' }]
  },
  bottomMessage: {
    color: colors.TEXT_GRAY,
    fontSize: Fonts.size(14),
    fontFamily: Fonts.type.regular,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 2,
    textAlign: 'center',
    marginBottom: 10,
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    position: 'absolute',
    zIndex: 1
  },
  book: {
    width: units.width / 1.4,
    height: units.height / 4
  },
  closeImage: {
    position: 'absolute',
    zIndex: 1,
    top: units.height / -45,
    right: units.width / 75
  },
  closeImageAndroid: {
    top: units.height / 12,
    right: units.width / 18,
    position: 'absolute',
    zIndex: 1
  },
  modal: {
    flex: 1,
    marginHorizontal: units.height / 100,
    marginVertical: units.height / 10
  },
  overlay: {
    position: 'absolute',
    zIndex: 99999,
    top: units.height / 3.3,
    left: units.width / 3.7
  },
  animation: {
    width: units.width / 2.5
  },
  webview: {
    backgroundColor: 'transparent',
    marginTop: units.height / 4.2
  }
});
