import React from "react";
import PropTypes from "prop-types";
import Icon from "react-hero-icon";
import { dcnb } from "cnbuilder";
import { ctaButtonVariants } from "./CtaButton.levers";
import { buttonSizes } from "../common/button/button.levers";
import { iconOptions, iconAnimations } from "../common/icon/icon.levers";
import getButtonSize from "../common/button/getButtonSize";
import getIconOption from "../common/icon/getIconOption";
import getIconClasses from "../common/icon/getIconClasses";
import getIconAnimation from "../common/icon/getIconAnimation";
import { SrOnlyText } from "../SrOnlyText/SrOnlyText";

/**
 * CTA Link Button Component
 *
 */
export const CtaButton = React.forwardRef(
  (
    {
      className,
      children,
      text,
      srText,
      variant,
      size,
      icon,
      iconProps,
      animate,
      ...props
    },
    ref
  ) => {
    // Defaults & Variables.
    // ---------------------------------------------------------------------------
    const levers = {};

    // Levers
    // ---------------------------------------------------------------------------

    // variant
    if (variant && ctaButtonVariants.includes(variant)) {
      switch (variant) {
        case "solid":
          levers.variant =
            "su-bg-digital-red hocus:su-bg-archway-dark su-text-white hocus:su-text-white su-border-2 su-border-digital-red su-border-solid hover:su-border-black focus:su-border-black";
          break;

        case "outline":
          levers.variant =
            "su-bg-white hocus:su-bg-white su-text-digital-red hocus:su-text-black su-border-2 su-border-digital-red su-border-solid hover:su-border-black focus:su-border-black";
          break;

        case "ghost":
          levers.variant =
            "su-bg-transparent su-text-white hocus:su-text-white su-border-2 su-border-white su-border-solid";
          break;

        default:
        // none.
      }
    }

    // size
    if (size && buttonSizes.includes(size)) {
      levers.size = getButtonSize(size);
    }

    // icon
    let heroicon = "";

    if (icon && iconOptions.includes(icon)) {
      heroicon = getIconOption(icon);
      levers.icon = getIconClasses(icon);
    }

    // animate
    // Add specific classes for each type of animation
    if (animate && iconAnimations.includes(animate)) {
      levers.animate = getIconAnimation(animate);
    }

    // Icon className.
    const { className: iconClasses, ...iProps } = iconProps || {};

    return (
      <div
        className={dcnb(
          "su-cta-button su-leading-display su-block su-w-fit  group-focus:su-underline su-group su-transition-colors",
          levers.size,
          levers.variant,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        {srText && <SrOnlyText srText={` ${srText}`} />}
        {icon && (
          <Icon
            icon={heroicon}
            type="solid"
            aria-hidden
            className={dcnb(
              "su-inline-block",
              levers.icon,
              levers.animate,
              iconClasses
            )}
            {...iProps}
          />
        )}
      </div>
    );
  }
);

CtaButton.propTypes = {
  /**
   * Css class names.
   */
  className: PropTypes.string,

  /**
   * Variant/button style
   */
  variant: PropTypes.oneOf(ctaButtonVariants),

  /**
   * Button size
   */
  size: PropTypes.oneOf(buttonSizes),

  /**
   * Icon options
   */
  icon: PropTypes.oneOf(iconOptions),

  /**
   * Icon options
   */
  iconProps: PropTypes.objectOf(PropTypes.any),

  /**
   * Icon animation on hover/focus
   */
  animate: PropTypes.oneOf(iconAnimations),

  /**
   * Optional text for screen readers
   */
  srText: PropTypes.string,
};

// Default Props.
// -----------------------------------------------------------------------------
CtaButton.defaultProps = {
  variant: "solid",
};
