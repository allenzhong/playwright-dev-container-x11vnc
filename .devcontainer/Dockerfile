#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------

FROM mcr.microsoft.com/playwright:v1.53.1-noble

# Save command line history for better development experience
RUN echo "export HISTFILE=/home/pwuser/commandhistory/.bash_history" >> "/home/pwuser/.bashrc" \
    && echo "export PROMPT_COMMAND='history -a'" >> "/home/pwuser/.bashrc" \
    && mkdir -p /home/pwuser/commandhistory \
    && touch /home/pwuser/commandhistory/.bash_history \
    && chown -R pwuser /home/pwuser/commandhistory

# Install Xvfb and VNC server for virtual display support
RUN apt-get update && apt-get install -y xvfb x11vnc
