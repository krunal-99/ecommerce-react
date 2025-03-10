import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../main";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Product } from "../data/types";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../features/cartSlice";
import { addToList, removeFromList } from "../features/wishListSlice";
import image from "../assets/images/product12.svg";
import { useEffect, useState } from "react";

const ProductHero = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const products = useSelector((state: RootState) => state.products.items);
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const wishlist = useSelector((state: RootState) => state.wishlist.list);

  const product = products.find((item) => item.id === Number(id));
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const cartItem = cart.find(
    (item) => item.id === Number(id) && item.color === selectedColor
  );
  const isInCart = Boolean(cartItem);
  const listItem = wishlist.find((item) => item.id === Number(id));
  const isInWishList = Boolean(listItem);

  const handleAddToCart = (product: Product) => {
    if (!product) return;
    const cartData = {
      id: product.id,
      imageUrl: product.imageUrls[0],
      title: product.title,
      color: selectedColor,
      price: product.salePrice,
      cartQuantity: 1,
    };

    dispatch(addToCart(cartData));
  };

  const handleAddToList = (product: Product) => {
    const listData = {
      id: product.id,
      imageUrl: product.imageUrls?.filter(Boolean)[0] || image,
      title: product.title,
      type: product.type,
      originalPrice: product.originalPrice,
      salePrice: product.salePrice,
      colors: product.colors,
      listQuantity: 1,
    };
    dispatch(addToList(listData));
  };

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || "");
    }
  }, [product]);

  const handleRemoveFromCart = () => {
    if (cartItem) {
      dispatch(removeFromCart(cartItem));
    }
  };

  if (!product) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "linear-gradient(to right, #ff9a9e, #fad0c4)",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          marginTop: "55px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            p: 4,
            borderRadius: "12px",
            background: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(10px)",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <SentimentVeryDissatisfiedIcon
            sx={{
              fontSize: 80,
              color: "#e74c3c",
              animation: "shake 1.5s infinite",
            }}
          />
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              color: "#252b42",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            Oops! Product Not Found
          </Typography>
          <Typography variant="body1" color="#555">
            The product you're looking for doesn't exist or has been removed.
          </Typography>
        </Box>
      </Container>
    );
  }
  return (
    <>
      <Box pt={8} width={{ xs: "100%", sm: "90%", md: "72%" }} margin="auto">
        <Stack py="30px" direction="row" alignItems="center" flexWrap="wrap">
          <Typography variant="body2" color="#252b42" fontWeight={700}>
            Home
          </Typography>
          <IconButton>
            <ArrowForwardIosIcon sx={{ width: "15px" }} />
          </IconButton>
          <Typography color="#bdbdbd" variant="body2" fontWeight={600}>
            Shop
          </Typography>
        </Stack>
      </Box>
      <Container sx={{ pb: "50px" }}>
        <Stack direction={{ xs: "column", md: "row" }} gap={3}>
          <Stack alignItems="center">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
              renderArrowPrev={(clickHandler, hasPrev) =>
                hasPrev && (
                  <Button
                    onClick={clickHandler}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: { xs: "5px", sm: "10px", md: "20px" },
                      zIndex: 2,
                      color: "white",
                      minWidth: "50px",
                      height: "50px",
                    }}
                  >
                    <ArrowBackIosIcon sx={{ fontSize: "30px" }} />
                  </Button>
                )
              }
              renderArrowNext={(clickHandler, hasNext) =>
                hasNext && (
                  <Button
                    onClick={clickHandler}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: { xs: "5px", sm: "10px", md: "20px" },
                      zIndex: 2,
                      color: "white",
                      minWidth: "50px",
                      height: "50px",
                    }}
                  >
                    <ArrowForwardIosIcon sx={{ fontSize: "30px" }} />
                  </Button>
                )
              }
            >
              {product.imageUrls.map((image: string, idx: number) => (
                <Box
                  component="img"
                  key={idx}
                  src={image}
                  width={{ xs: "100%", sm: "510px" }}
                  height={{ xs: "auto", sm: "410px" }}
                  sx={{ objectFit: "cover" }}
                ></Box>
              ))}
            </Carousel>
            <Stack
              ml={{ xs: 0, sm: "15px" }}
              mt="10px"
              direction="row"
              spacing={1}
              flexWrap="wrap"
              justifyContent="center"
            >
              {product.imageUrls.map((image: string, idx: number) => (
                <Box
                  component="img"
                  key={idx}
                  src={image}
                  width={80}
                  height={60}
                  sx={{ objectFit: "cover", cursor: "pointer" }}
                ></Box>
              ))}
            </Stack>
          </Stack>
          <Stack
            spacing={2}
            px={{ xs: 2, sm: 0 }}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Typography color="#252b42" variant="h6" fontWeight={600}>
              {product.title}
            </Typography>
            <Stack
              direction="row"
              py="15px"
              alignItems="center"
              justifyContent={{ xs: "center", md: "flex-start" }}
              gap={1}
            >
              <Rating
                name="size-large"
                max={5}
                readOnly
                value={product.rating / 2}
                precision={0.5}
                size="large"
              />
              <Typography variant="body2" color="#737373" fontWeight={700}>
                {product.reviewCount} Reviews
              </Typography>
            </Stack>
            <Typography color="#252b42" variant="h5" fontWeight={700}>
              ₹ {product.salePrice}
            </Typography>
            <Typography
              color="#858585"
              fontWeight={500}
              pb="20px"
              textAlign={{ xs: "center", md: "left" }}
            >
              {product.detailDescription}
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              pb="30px"
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              {product.colors.map((color: string, index: number) => (
                <Box
                  component="button"
                  onClick={() => setSelectedColor(color)}
                  key={index}
                  width={30}
                  height={30}
                  borderRadius="50%"
                  sx={{
                    backgroundColor: color,
                    transition: "all 0.3s ease-in-out",
                    cursor: "pointer",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                    transform: selectedColor === color ? "scale(1.2)" : "",
                    border:
                      selectedColor === color
                        ? "2px solid #000"
                        : "2px solid transparent",
                  }}
                />
              ))}
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ xs: "center", sm: "flex-start" }}
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              {isInCart ? (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <Button
                    onClick={handleRemoveFromCart}
                    variant="contained"
                    color="error"
                    sx={{
                      fontWeight: 700,
                      width: { xs: "100%", sm: "auto" },
                    }}
                    size="large"
                  >
                    Remove from Cart
                  </Button>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="Basic button group"
                  >
                    <Button
                      onClick={() => dispatch(decreaseQuantity(cartItem))}
                      sx={{
                        backgroundColor: "#252b42",
                        color: "white",
                        borderRadius: 0,
                      }}
                    >
                      <RemoveIcon sx={{ width: "15px" }} />
                    </Button>
                    <Button sx={{ fontWeight: 600 }}>
                      {cartItem?.cartQuantity}
                    </Button>
                    <Button
                      onClick={() => dispatch(addToCart(cartItem))}
                      sx={{
                        backgroundColor: "#fafafa",
                        color: "black",
                        borderRadius: 0,
                      }}
                    >
                      <AddIcon sx={{ width: "15px" }} />
                    </Button>
                  </ButtonGroup>
                </Box>
              ) : (
                <Button
                  onClick={() => handleAddToCart(product)}
                  variant="contained"
                  sx={{
                    backgroundColor: "#23a6f0",
                    fontWeight: 700,
                    width: { xs: "100%", sm: "auto" },
                  }}
                  size="large"
                >
                  Add To Cart
                </Button>
              )}
              <Stack direction="row" spacing={1}>
                <Button
                  onClick={() =>
                    isInWishList
                      ? dispatch(removeFromList(product))
                      : handleAddToList(product)
                  }
                  sx={{ p: 0 }}
                  disableRipple
                  disableFocusRipple
                  disableElevation
                >
                  <Avatar
                    sx={{ border: "1px solid #e8e8e8", bgcolor: "white" }}
                  >
                    {isInWishList ? (
                      <FavoriteIcon sx={{ color: "#ff0000" }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: "#252b42" }} />
                    )}
                  </Avatar>
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default ProductHero;
